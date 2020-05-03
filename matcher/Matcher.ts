import { Component } from "../component/Component";
import { Entity } from "../entity/Entity";
import { Ctor } from "../helper/Types";

export type MatcherItem = Ctor<Component> | Matcher;

/**
 * A Component Matcher to select entities from context.
 */
export interface Matcher {
  matches(entity: Entity): boolean;
}
