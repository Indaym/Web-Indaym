//
// created by djavrell on Wed Jun 21 2017
//

/**
 * to add the rule you just create to the list of rules
 * available to load, follow this 2 steps:
 *
 * > import the rule as follow `import { className } from './path/to/your/file'`
 *
 * > add the `className` into the `RULES_REF` at the end of the file
 * Ps: to prevent any git conflict, add a `,` at the end
 */

import { TestRuleTrue }   from './testRuleTrue';
import { TestRuleFalse }  from './testRuleFalse';
import { ChangeColor }    from './changeColor';
import { MoveForward }    from './moveForward';

export const RULES_DEF = {
  TestRuleTrue,
  TestRuleFalse,
  ChangeColor,
  MoveForward,
};
