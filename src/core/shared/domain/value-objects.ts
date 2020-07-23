/* prettier-ignore */
/*eslint-disable*/

import { shallowEqual } from "shallow-equal-object";

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine member
 * equality through tmember structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor (props: T) {
    this.props = Object.freeze(props);
  }
}