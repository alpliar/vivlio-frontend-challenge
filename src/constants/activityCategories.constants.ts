export enum ActivityCategory {
  Education = "education",
  Recreational = "recreational",
  Social = "social",
  DIY = "diy",
  Charity = "charity",
  Cooking = "cooking",
  Relaxation = "relaxation",
  Music = "music",
  BusyWork = "busywork",
}

export interface IActivityCategoryInfo {
  id: ActivityCategory;
  name: string;
  icon: string;
}

export const activityCategoriesInfo: Array<IActivityCategoryInfo> = [
  { id: ActivityCategory.Education, name: "Education", icon: "📚" },
  { id: ActivityCategory.Recreational, name: "Recreational", icon: "⚽" },
  { id: ActivityCategory.Social, name: "Social", icon: "🧑🏽‍🤝‍🧑🏻" },
  { id: ActivityCategory.DIY, name: "DIY", icon: "🔧" },
  { id: ActivityCategory.Charity, name: "Charity", icon: "🫶" },
  { id: ActivityCategory.Cooking, name: "Cooking", icon: "🧑‍🍳" },
  { id: ActivityCategory.Relaxation, name: "Relaxation", icon: "🛀" },
  { id: ActivityCategory.BusyWork, name: "Busywork", icon: "👔" },
  { id: ActivityCategory.Music, name: "Music", icon: "🎸" },
];
