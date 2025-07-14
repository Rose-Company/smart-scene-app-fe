"use client";
import { useState, useEffect } from "react";
import { getFilterSidebarTags } from "@/app/libs/services/videoServices";
import { FilterPositionType } from "@/app/types/Tag";
import style from "./style.module.css";

interface SideBarProps {
  onFilterSubmit?: (filters: Record<number, string[]>) => void;
  onGetAll?: () => void;
}

export default function SideBar({ onFilterSubmit, onGetAll }: SideBarProps) {
  const [show, setShow] = useState(true);
  const [selectedTagCodes, setSelectedTagCodes] = useState<
    Record<number, string[]>
  >({});
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
        // Initialize selected tag codes for each category
        const initialSelected: Record<number, string[]> = {};
        const initialCollapsed: Record<number, boolean> = {};
        filtersData.forEach((position) => {
          position.categories.forEach((category) => {
            initialSelected[category.category_id] = [];
            initialCollapsed[category.category_id] = false;
          });
        });
        setSelectedTagCodes(initialSelected);
        setCollapsedCategories(initialCollapsed);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const toggleTag = (categoryId: number, tagCode: string) => {
    setSelectedTagCodes((prev) => {
      const currentSelected = prev[categoryId] || [];
      // Always allow multiple selections
      const newSelected = currentSelected.includes(tagCode)
        ? currentSelected.filter((code) => code !== tagCode)
        : [...currentSelected, tagCode];

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

  const getSelectedTagCodesForCategory = (categoryId: number): string[] => {
    return selectedTagCodes[categoryId] || [];
  };

  const handleSubmit = () => {
    if (onFilterSubmit) {
      onFilterSubmit(selectedTagCodes);
    }
    console.log("Applied filters:", selectedTagCodes);
  };

  const handleClear = () => {
    const clearedTags: Record<number, string[]> = {};
    Object.keys(selectedTagCodes).forEach((categoryId) => {
      clearedTags[parseInt(categoryId)] = [];
    });
    setSelectedTagCodes(clearedTags);
  };

  const handleGetAll = () => {
    if (onGetAll) {
      onGetAll();
    }
    // Clear all selected filters
    const clearedTags: Record<number, string[]> = {};
    Object.keys(selectedTagCodes).forEach((categoryId) => {
      clearedTags[parseInt(categoryId)] = [];
    });
    setSelectedTagCodes(clearedTags);
  };

  const hasSelectedFilters = Object.values(selectedTagCodes).some(
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
                              checked={getSelectedTagCodesForCategory(
                                category.category_id
                              ).includes(tag.tag_code)}
                              onChange={() =>
                                toggleTag(category.category_id, tag.tag_code)
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
                <button className={style.getAllButton} onClick={handleGetAll}>
                  Get All Videos
                </button>
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
