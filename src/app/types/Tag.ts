export type TagType = {
  tag_id: number;
  tag_name: string;
  tag_code: string;
  tag_color: string;
  category_id: number;
  category_name: string;
  priority: number;
};

export type FilterTagType = {
  tag_id: number;
  tag_name: string;
  tag_code: string;
  color: string;
  usage_count: number;
  is_active: boolean;
};

export type FilterCategoryType = {
  category_id: number;
  category_name: string;
  category_code: string;
  color: string;
  filter_type: "single" | "multiple";
  display_style: "radio" | "checkbox";
  tags: FilterTagType[];
};

export type FilterPositionType = {
  position_id: number;
  position_title: string;
  position_code: string;
  categories: FilterCategoryType[];
};
