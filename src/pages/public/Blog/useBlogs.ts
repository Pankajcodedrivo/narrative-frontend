import { useEffect, useState } from "react";
import { getBlogCategories, getBlogs } from "../../../services/apis/blog.api";

export type BlogItem = {
  _id?: string;
  slug?: string;
  featuredImage?: string;
  title?: string;
  excerpt?: string;
  blogCategory?: { name?: string };
  category?: string | { name?: string } | Array<string | { name?: string }>;
  categories?: string | { name?: string } | Array<string | { name?: string }>;
};

type BlogCategoryItem = {
  _id?: string;
  name?: string;
};

const getBlogCategoryNames = (blog: BlogItem) => {
  if (blog.blogCategory?.name) return [blog.blogCategory.name];

  const value = blog.categories ?? blog.category;

  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item : (item?.name ?? "")))
      .filter(Boolean);
  }

  if (typeof value === "string") return value.trim() ? [value.trim()] : [];
  if (value?.name) return [value.name];

  return [];
};

const PAGE_SIZE = 6;

const useBlogs = () => {
  const [allBlogs, setAllBlogs] = useState<BlogItem[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      try {
        const firstPageRes = await getBlogs(1, PAGE_SIZE);
        const firstPageBlogs = (firstPageRes?.result?.blogs ??
          []) as BlogItem[];
        const totalApiPages = firstPageRes?.result?.totalPages ?? 1;

        if (totalApiPages <= 1) {
          setAllBlogs(firstPageBlogs);
          return;
        }

        const pageRequests = Array.from(
          { length: totalApiPages - 1 },
          (_, idx) => getBlogs(idx + 2, PAGE_SIZE),
        );
        const remainingPages = await Promise.all(pageRequests);
        const remainingBlogs = remainingPages.flatMap(
          (res) => (res?.result?.blogs ?? []) as BlogItem[],
        );

        setAllBlogs([...firstPageBlogs, ...remainingBlogs]);
      } catch (error) {
        console.error(error);
        setAllBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const res = await getBlogCategories(1, 50);
        const categories = (res?.result?.categories ??
          []) as BlogCategoryItem[];

        setCategoryOptions(
          categories
            .map((category) => category.name?.trim() ?? "")
            .filter(Boolean),
        );
      } catch (error) {
        console.error(error);
        setCategoryOptions([]);
      }
    };

    fetchCategoryOptions();
  }, []);

  const filteredAllBlogs = selectedCategories.length
    ? allBlogs.filter((blog) =>
        selectedCategories.some((category) =>
          getBlogCategoryNames(blog).includes(category),
        ),
      )
    : allBlogs;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAllBlogs.length / PAGE_SIZE),
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const start = (page - 1) * PAGE_SIZE;

  const filteredBlogs = filteredAllBlogs.slice(start, start + PAGE_SIZE);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  return {
    filteredBlogs,
    categoryOptions,
    selectedCategories,
    loading,
    page,
    totalPages,
    setPage,
    setSelectedCategories,
    toggleCategory,
  };
};

export default useBlogs;
