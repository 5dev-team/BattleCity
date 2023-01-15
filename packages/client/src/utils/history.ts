import { createBrowserHistory, History } from 'history'

let history: History | undefined
function useBrowserHistory() {
  if (!history) {
    history = createBrowserHistory()
  }

  return history
}

export default useBrowserHistory
