namespace ToDoList.Api.Models
{
    public class ToDo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool isCompleted { get; set; }
        public DateTime? CompletedDate { get; set; }
        public bool isDeleted { get; set; }
        public DateTime? deletedDate { get; set; }
    }
}
