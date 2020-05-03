import { Entity } from "../../entity/Entity";
import { AbstractMatcher } from "./AbstractMatcher";

/**
 * A Matcher to select entity which contains all of given components.
 */
export class AllOfMatcher extends AbstractMatcher {
  public matches(entity: Entity): boolean {
    return this.items.every(item => this.match(entity, item));
  }

}
