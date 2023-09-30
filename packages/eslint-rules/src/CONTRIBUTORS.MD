### tags.ts

Functions return `null` or `ValidationError` where `ValidationError` is any other truthy value. 
This API design has a better DX compared to the alternatives.
The choice for `null` is because it is more predictable than `undefined`,
and more intuitive than returning `false` in validators named like e.g. `notEmpty` or `isInt`.

```typescript
const validatorResult: null | ErrorObject = validator('42');

if (validatorResult) {
  context.report({
    node,
    messageId: INVALID_MESSAGE_ID,
    message: `... ${validatorResult}}`
  });
  return;
}

if(validatorResult) {
  console.log('valid data');
}
```

```typescript
const validatorResult: true | ErrorObject = validator();

if(validatorResult !== true) {
  context.report({
    node,
    messageId: INVALID_MESSAGE_ID,
    message: `... ${validatorResult}}`
  });
  return;
}

if(validatorResult === true) {
  console.log('valid data');
}
```
