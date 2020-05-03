import { Entity } from "../../entity/Entity";
import { AbstractMatcher } from "./AbstractMatcher";

/**
 * A Matcher to select entity which contains any of given components.
 */
export class AnyOfMatcher extends AbstractMatcher {
  public matches(entity: Entity): boolean {
    return this.items.some(item => this.match(entity, item));
  }
}
