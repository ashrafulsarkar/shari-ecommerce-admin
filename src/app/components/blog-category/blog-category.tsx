"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ErrorMsg from "../common/error-msg";
import { useGetAllBlogCategoriesQuery } from "@/redux/blog-category/categoryApi";

// prop type
type IPropType = {
  setCategory: React.Dispatch<SetStateAction<{ name: string; id: string }>>;
  setParent: React.Dispatch<SetStateAction<string>>;
  default_value?: {
    name: string;
    id: string;
  };
};

export default function BlogCategory({
  setCategory,
  setParent,
  default_value,
}: IPropType) {
  const [open, setOpen] = React.useState<string>("");
  const { data: categories, isError, isLoading } = useGetAllBlogCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    default_value ? [default_value.name] : []
  );

  useEffect(() => {
    if (default_value?.name && default_value.id) {
      const { id, name } = default_value;
      setCategory({ id: id, name: name });
      setParent(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handleCategory
  const handleCategory = (value: string, title: string) => {
    setOpen(open === value ? "" : value);
    if (title) {
      if (selectedCategory.includes(title)) {
        setSelectedCategory(selectedCategory.filter((c) => c !== title));
      } else {
        setSelectedCategory([...selectedCategory, title]);
      }
    }
  };

  useEffect(() => {
    const lastCategory = selectedCategory[selectedCategory.length - 1];
    if (lastCategory) {
      const matchingItem = categories?.find((item: any) => item.name === lastCategory);
      if (matchingItem) {
        setCategory({ id: matchingItem._id, name: lastCategory });
        setParent(lastCategory);
      }
    }
  }, [selectedCategory]);

  // handle sub category
  const handleSubCategory = (subCate: string) => {
    if (selectedCategory.includes(subCate)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== subCate));
    } else {
      setSelectedCategory([...selectedCategory, subCate]);
    }
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.length === 0) {
    content = <ErrorMsg msg="No Category Found" />;
  }

  if (!isLoading && !isError ) {
    const categoryItems = categories;

    content = (
      <>
        <List className="p-0">
          {categoryItems.map((item:any) => (
            <Accordion
              key={item._id}
              open={open === item._id}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === item._id ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === item._id}>
                <AccordionHeader
                  onClick={() => handleCategory(item._id, item.name)}
                  className="border-b-0 p-3"
                >
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal mb-0"
                  >
                    {item.name}
                  </Typography>
                </AccordionHeader>
              </ListItem>
            </Accordion>
          ))}
        </List>
      </>
    );
  }

  return (
    <>
      <div className="tags-input-wrapper mb-2">
        {selectedCategory.map((c, i) => (
          <span key={i} className="tag">
            {c}
            <b onClick={() => handleCategory("", c)}>×</b>
          </span>
        ))}
      </div>
      <div className="h-80 overflow-y-scroll overflow-x-hidden">
        <Card>{content}</Card>
      </div>
    </>
  );
}
