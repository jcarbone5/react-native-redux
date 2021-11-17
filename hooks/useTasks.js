import { useSelector } from 'react-redux'

const useTasks = () => useSelector(state => state.tasks);

export default useTasks;