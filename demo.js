class count_objects 
{
  static i= 0;
constructor()
{
  count_objects.i=count_objects.i+1;
}
}
   var a= new count_objects();
   var b = new count_objects();
   var c = new count_objects();
   var d= new count_objects();
   var e = new count_objects();
   



  console.log(count_objects.i);