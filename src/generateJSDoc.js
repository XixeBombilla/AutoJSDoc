function generateJSDoc(func) {
  const functionName = func.id?.name || "anonymousFunction";

  const inferType = (paramName) => {
    if (/^(num|count|total|sum|amount)/i.test(paramName)) return "number";
    if (/^(str|text|message|name)/i.test(paramName)) return "string";
    if (/^(is|has|can|should)/i.test(paramName)) return "boolean";
    if (/^(arr|list|items|values)/i.test(paramName)) return "Array";
    if (/^(cb|callback|fn|handler)/i.test(paramName)) return "Function";
    return "any";
  };

  const params = func.params
    .map(
      (param) =>
        ` * @param {${inferType(param.name)}} ${param.name} - ${
          param.name
        } of the ${functionName} function.`
    )
    .join("\n");

  const inferReturnType = (node) => {
    if (!node.body) return "void";
    const returnStatements = node.body.body.filter(
      (stmt) => stmt.type === "ReturnStatement"
    );
    if (returnStatements.length === 0) return "void";

    const returnValue = returnStatements[0].argument;
    if (!returnValue) return "void";

    switch (returnValue.type) {
      case "Literal":
        return typeof returnValue.value;
      case "BinaryExpression":
      case "CallExpression":
        return "number";
      case "ArrayExpression":
        return "Array";
      case "ObjectExpression":
        return "Object";
      case "ArrowFunctionExpression":
      case "FunctionExpression":
        return "Function";
      default:
        return "any";
    }
  };

  const returnType = inferReturnType(func);

  return `*\n * ${functionName} - Automatically generated function description.\n${params}\n * @returns {${returnType}} - The result of ${functionName}.`;
}

export default generateJSDoc;
