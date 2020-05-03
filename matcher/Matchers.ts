import { MatcherItem } from "./Matcher";
import { AllOfMatcher } from "./subtypes/AllOfMatcher";
import { AnyOfMatcher } from "./subtypes/AnyOfMatcher";
import { NoneOfMatcher } from "./subtypes/NoneOfMatcher";

// static matcher utils

/** create an all-of matcher */
export function allOf(...args: MatcherItem[]): AllOfMatcher {
  return new AllOfMatcher(...args);
}

/** create an any-of matcher */
export function anyOf(...args: MatcherItem[]): AnyOfMatcher {
  return new AnyOfMatcher(...args);
}

/** create an none-of matcher */
export function noneOf(...args: MatcherItem[]): NoneOfMatcher {
  return new NoneOfMatcher(...args);
}
