import { omit } from './omit';

type TestObjectType = Record<string, number>;

let inputObject: TestObjectType;
const omittedKeys = ['b', 'd'];

beforeEach(() => {
  inputObject = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
});

describe('omit function', () => {
  describe('should return first argument directly if it\'s not an object', () => {
    test('when it is a number', () => {
      const input = 1;
      const output = omit(input, omittedKeys);

      expect(output).toBe(input);
    });

    test('when it is a string', () => {
      const input = '1';
      const output = omit(input, omittedKeys);

      expect(output).toBe(input);
    });

    test('when it is undefined', () => {
      const input = undefined;
      const output = omit(input, omittedKeys);

      expect(output).toBe(input);
    });

    test('when it is null', () => {
      const input = null;
      const output = omit(input, omittedKeys);

      expect(output).toBe(input);
    });
  });

  test('should return a new object', () => {
    const outputObject = omit(inputObject, omittedKeys);

    expect(outputObject === inputObject).toBe(false);
  });

  test('should return an object without omitted props', () => {
    const outputObject = omit(inputObject, omittedKeys);

    for (let i = 0; i < omittedKeys.length; i += 1) {
      expect(omittedKeys[i] in outputObject).toBe(false);
    }
  });

  test('should not modify the input object', () => {
    omit(inputObject, omittedKeys);

    for (let i = 0; i < omittedKeys.length; i += 1) {
      expect(omittedKeys[i] in inputObject).toBe(true);
    }
  });

  test('should have same props between input and output object except omitted keys', () => {
    const outputObject: TestObjectType = omit(inputObject, omittedKeys);
    const restKeys = Object.keys(outputObject);

    for (let i = 0; i < restKeys.length; i += 1) {
      expect(outputObject[restKeys[i]]).toEqual(inputObject[restKeys[i]]);
    }
  });
});
