"use client";
import { useState, useEffect } from "react";
import { getFilterSidebarTags } from "@/app/libs/services/videoServices";
import { FilterPositionType } from "@/app/types/Tag";
import style from "./style.module.css";

interface SideBarProps {
  onFilterSubmit?: (filters: Record<number, string[]>) => void;
}

export default function SideBar({ onFilterSubmit }: SideBarProps) {
  const [show, setShow] = useState(true);
  const [selectedTags, setSelectedTags] = useState<Record<number, string[]>>(
    {}
  );
  const [filterData, setFilterData] = useState<FilterPositionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filtersData = await getFilterSidebarTags();
        setFilterData(filtersData);
        // Initialize selected tags for each category
        const initialSelected: Record<number, string[]> = {};
        const initialCollapsed: Record<number, boolean> = {};
        filtersData.forEach((position) => {
          position.categories.forEach((category) => {
            initialSelected[category.category_id] = [];
            initialCollapsed[category.category_id] = false;
          });
        });
        setSelectedTags(initialSelected);
        setCollapsedCategories(initialCollapsed);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const toggleTag = (categoryId: number, tagId: string) => {
    setSelectedTags((prev) => {
      const currentSelected = prev[categoryId] || [];
      // Always allow multiple selections
      const newSelected = currentSelected.includes(tagId)
        ? currentSelected.filter((id) => id !== tagId)
        : [...currentSelected, tagId];

      return {
        ...prev,
        [categoryId]: newSelected,
      };
    });
  };

  const toggleCategory = (categoryId: number) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const getSelectedTagsForCategory = (categoryId: number): string[] => {
    return selectedTags[categoryId] || [];
  };

  const handleSubmit = () => {
    if (onFilterSubmit) {
      onFilterSubmit(selectedTags);
    }
    console.log("Applied filters:", selectedTags);
  };

  const handleClear = () => {
    const clearedTags: Record<number, string[]> = {};
    Object.keys(selectedTags).forEach((categoryId) => {
      clearedTags[parseInt(categoryId)] = [];
    });
    setSelectedTags(clearedTags);
  };

  const hasSelectedFilters = Object.values(selectedTags).some(
    (tags) => tags.length > 0
  );

  return (
    <div className={style.sidebar}>
      <div className={style.header} onClick={() => setShow(!show)}>
        <span>Filters</span>
        <span>{show ? "▾" : "▸"}</span>
      </div>

      {show && (
        <div className={style.categoryBlock}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {filterData.map((position) =>
                position.categories.map((category) => (
                  <div
                    key={category.category_id}
                    className={style.categorySection}
                  >
                    <div
                      className={style.categoryHeader}
                      onClick={() => toggleCategory(category.category_id)}
                    >
                      {category.category_name}
                      <span className={style.arrow}>
                        {collapsedCategories[category.category_id] ? "▸" : "▾"}
                      </span>
                    </div>
                    {!collapsedCategories[category.category_id] && (
                      <div className={style.categoryList}>
                        {category.tags.map((tag) => (
                          <label
                            key={tag.tag_id}
                            className={style.categoryItem}
                          >
                            <input
                              type="checkbox"
                              checked={getSelectedTagsForCategory(
                                category.category_id
                              ).includes(tag.tag_id.toString())}
                              onChange={() =>
                                toggleTag(
                                  category.category_id,
                                  tag.tag_id.toString()
                                )
                              }
                            />
                            <span style={{ color: tag.color }}>
                              {tag.tag_name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}

              <div className={style.filterActions}>
                <button
                  className={style.submitButton}
                  onClick={handleSubmit}
                  disabled={!hasSelectedFilters}
                >
                  Apply Filters
                </button>
                <button
                  className={style.clearButton}
                  onClick={handleClear}
                  disabled={!hasSelectedFilters}
                >
                  Clear All
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
