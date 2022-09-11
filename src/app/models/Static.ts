export class StaticMethods
{
    public static GetDate(x: number)
    {
      var date = new Date(x/80560);
  
      return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    }
}