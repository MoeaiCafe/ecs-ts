import { Component } from "../../component/Component";
import { Entity } from "../../entity/Entity";
import { Ctor } from "../../helper/Types";
import { Matcher, MatcherItem } from "../Matcher";

/**
 * Abstract Matcher implmentation.
 */
export abstract class AbstractMatcher implements Matcher {
  protected readonly items: MatcherItem[];

  constructor(...items: MatcherItem[]) {
    this.items = items;
  }

  public abstract matches(entity: Entity): boolean;

  protected match(entity: Entity, item: MatcherItem): boolean {
    if (item instanceof AbstractMatcher) {
      // matcher
      return item.matches(entity);
    } else {
      // component
      item = item as Ctor<Component>;
      return entity.hasComponent(item);
    }
  }

  public toString(): string {
    // TODO cache
    const itemNames = this.items.map(item => {
      if (item instanceof AbstractMatcher) {
        return item.toString();
      } else {
        return item.constructor.name;
      }
    })
    return `${this.constructor.name}[${itemNames.join()}]`
  }

}
