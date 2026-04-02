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

const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      try {
        const res = await getBlogs(page, 6);
        setBlogs(res?.result?.blogs ?? []);
        setTotalPages(res?.result?.totalPages ?? 1);
      } catch (error) {
        console.error(error);
        setBlogs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const res = await getBlogCategories(1, 50);
        const categories = (res?.result?.categories ?? []) as BlogCategoryItem[];

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

  const filteredBlogs = selectedCategories.length
    ? blogs.filter((blog) =>
        selectedCategories.some((category) =>
          getBlogCategoryNames(blog).includes(category),
        ),
      )
    : blogs;

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
