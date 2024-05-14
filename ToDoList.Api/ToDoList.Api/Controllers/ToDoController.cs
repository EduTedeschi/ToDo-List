using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Api.Context;
using ToDoList.Api.Models;

namespace ToDoList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoDbContext _toDoDbContext;

        public ToDoController(ToDoDbContext toDoDbContext)
        {
            _toDoDbContext = toDoDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllToDos()
        {
            var todos = await _toDoDbContext.ToDos
                .Where(x => x.isDeleted == false)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();

            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> AddToDo(ToDo todo)
        {
            _toDoDbContext.ToDos.Add(todo);
            await _toDoDbContext.SaveChangesAsync();

            return Ok(todo);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateToDo(Guid id, ToDo todo)
        {
            var toDo = await _toDoDbContext.ToDos.FindAsync(id);

            if(toDo == null) return NotFound();

            toDo.isCompleted = todo.isCompleted;
            toDo.CompletedDate = DateTime.Now;

            await _toDoDbContext.SaveChangesAsync();

            return Ok(toDo);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteToDo(Guid id)
        {
            var toDo = await _toDoDbContext.ToDos.FindAsync(id);

            if (toDo == null) return NotFound();

            toDo.isDeleted = true;
            toDo.deletedDate = DateTime.Now;

            await _toDoDbContext.SaveChangesAsync();

            return Ok(toDo);
        }
    }
}
