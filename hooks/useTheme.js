import { useSelector } from 'react-redux'

const useTheme = () => useSelector(state => state.theme);

export default useTheme;