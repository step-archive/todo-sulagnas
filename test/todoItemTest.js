let assert = require('chai').assert;
const TodoItem=require('../src/models/todoItem.js');

describe('todo item has one item ,status and a id',function () {
  beforeEach(()=>{
    storyBook=new TodoItem('buy story book');
  })
  it('has one item',function () {
    assert.equal(storyBook.getItem(),'buy story book');
  })
  it('todoItem can be edited',function () {
    storyBook.edit('buy two story book');
    assert.equal(storyBook.getItem(),'buy two story book');
  })
})
describe('todoItem can be selected on not selected',function (){
  beforeEach(()=>{
    storyBook=new TodoItem('buy story book');
  });
  it('can select one todo item',function(){
    storyBook.markAsDone();
    assert.equal(storyBook.isDone(),true);
  })
  it('can unselect one todo item',function(){
    storyBook.markAsUndone();
    assert.equal(storyBook.isDone(),false);
  })
})
