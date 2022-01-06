function test({todo}) {
  return(
    <>{todo.title}</>
  )

}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const todo = await res.json();
  return {
    props: {
      todo
    },
  }
}

export default test;