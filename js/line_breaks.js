function lineBreaks(input)
{
  
  var output = "";
  output = input.replace(/(?:\r\n|\r|\n)/g, '\\n');
  
  return output;
}