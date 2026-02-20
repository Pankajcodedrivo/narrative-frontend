import "./AccordionItem.scss";
import acc1 from "../../assets/images/acc-open.svg";
import acc2 from "../../assets/images/acc-close.svg";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};
const AccordionItem = ({ title,
  children,
  isOpen,
  onToggle, }:AccordionItemProps) => {
  return (
    <div className="accordion-item">
      <button  type="button"
        className="accordion-header"
        onClick={onToggle}
      >
        {title}
        <span><img
            src={isOpen ? acc1 : acc2}
            alt={isOpen ? "collapse" : "expand"}
        /></span>
      </button>

      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
};

export default AccordionItem;