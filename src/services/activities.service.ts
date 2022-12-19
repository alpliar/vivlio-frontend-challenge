import {
  activityCategoriesInfo,
  IActivityCategoryInfo,
} from "../constants/activityCategories.constants";
import { IActivity } from "../models/activity.model";

export default class ActivityHelper {
  static getRandomActivity = async (): Promise<IActivity> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!process.env.REACT_APP_BORED_API_URL)
          throw Error("API URL is not defined in .env");

        const response = await fetch(process.env.REACT_APP_BORED_API_URL).catch(
          (error) => {
            throw error;
          }
        );
        if (!response.ok)
          throw Error(`API did not respond: ${response.statusText}`);
        const json = await response.json();
        resolve(json);
        if (!json) throw Error("Cannot convert API response to destination");
      } catch (error) {
        reject(error);
      }
    });
  };
  static getCategoryInfos = (categoryId: string): IActivityCategoryInfo => {
    const found = activityCategoriesInfo.find(
      (activity: IActivityCategoryInfo) => activity.id === categoryId
    );

    if (found) return found;
    throw Error(`Category with id ${categoryId} not found`);
  };
  static getPriceLabel = (price: IActivity["price"]): string => {
    if (price === 0) return "🆓 Free";
    if (price < 0.5) return "💰 Cheap";
    if (price < 0.75) return "💰💰 Quite expensive";
    return "💰💰💰 Expensive";
  };
  static getAccessibilityLabel = (
    accessibility: IActivity["accessibility"]
  ): string => {
    if (accessibility === 0) return "✌️ No effort";
    if (accessibility < 0.5) return "💪 Low effort";
    if (accessibility < 0.75) return "💪💪 Average effort";
    return "💪💪💪 Big effort";
  };
}
