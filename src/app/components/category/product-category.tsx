"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Typography,
  List,
  ListItem
} from "@material-tailwind/react";
import { useGetAllCategoriesQuery } from "@/redux/category/categoryApi";
import ErrorMsg from "../common/error-msg";

// Props
type IPropType = {
  setCategory: React.Dispatch<React.SetStateAction<{ name: string; id: string }>>;
  setParent: React.Dispatch<React.SetStateAction<string>>;
  default_value?: {
    category: { name: string; id: string };
    parent: string;
  };
};

const ProductCategory = ({
  setCategory,
  setParent,
  default_value,
}: IPropType) => {
  const { data: categories, isError, isLoading } = useGetAllCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>(default_value?.parent || "");

  const initialized = useRef(false); // Prevent infinite loop

  // Set default category on initial load (e.g., for edit mode)
  useEffect(() => {
    if (
      !initialized.current &&
      default_value?.category &&
      categories?.result?.length
    ) {
      const matched = categories.result.find(c => c._id === default_value.category.id);
      if (matched) {
        setSelectedCategory(matched.parent);
        setCategory({ id: matched._id, name: matched.parent });
        setParent(matched.parent);
        initialized.current = true;
      }
    }
  }, [default_value, categories, setCategory, setParent]);

  const handleCategorySelect = (id: string, name: string) => {
    setSelectedCategory(name);
    setCategory({ id, name });
    setParent(name);
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError || !categories?.result?.length)
    return <ErrorMsg msg="Failed to load categories" />;

  return (
    <>
      <div className="tags-input-wrapper mb-2">
        {selectedCategory && (
          <span className="tag">
            {selectedCategory}
            <b onClick={() => {
              setSelectedCategory("");
              setCategory({ id: "", name: "" });
              setParent("");
            }}>x</b>
          </span>
        )}
      </div>

      <div className="h-80 overflow-y-scroll overflow-x-hidden bg-white p-2 rounded-md">
        <Card className="shadow-none">
          <List className="p-0">
            {categories.result.map((item) => (
              <ListItem
                key={item._id}
                className={`cursor-pointer rounded ${
                  selectedCategory === item.parent ? "bg-blue-100 font-semibold" : ""
                }`}
                onClick={() => handleCategorySelect(item._id, item.parent)}
              >
                <Typography color="blue-gray" className="m-0">
                  {item.parent}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </>
  );
};

export default ProductCategory;
