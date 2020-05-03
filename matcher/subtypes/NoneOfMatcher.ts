import { Entity } from "../../entity/Entity";
import { AbstractMatcher } from "./AbstractMatcher";

/**
 * A Matcher to select entity which contains none of given components.
 * Can be used as a NOT operator.
 */
export class NoneOfMatcher extends AbstractMatcher {
  public matches(entity: Entity): boolean {
    return this.items.every(item => !this.match(entity, item));
  }
}
