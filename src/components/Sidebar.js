const Sidebar = () => {
    return (
      <>
        <aside className="fixed top-0 left-0 w-64 h-full" aria label="Sidenav">
          <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <ul className="space-y-2">
              <li>
                <a href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
              <a href="/api/auth/updateLineChart" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">Update Line Graph</span>
              </a>
              </li>
              <li>
              <a href="/api/auth/updateBarChart" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">Update Bar Graph</span>
              </a>
              </li>
              <li>
                <a href="/api/auth/updatePieChart" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ml-3 whitespace-nowrap">Update Pie Graph</span>
                </a>
              </li>
             
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <span className="ml-3">Calendar</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <span className="ml-3">Receipts</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <span className="ml-3">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </>
    )
  }
  
  export default Sidebar;