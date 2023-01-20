export default function LoadingArticles() {
  return (
    <div className="font-sans">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Recent Articles
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the articles in your account including their title,
            url and date added.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date Added
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white animate-pulse min-w-full">
                  {Array.from(Array(4).keys()).map((item) => (
                    <tr key={item}>
                      <td>
                        <div className="inline-block h-5 bg-gray-200 rounded-full dark:bg-gray-700 m-2 w-96"></div>
                      </td>
                      <td>
                        <div className="inline-block h-5 bg-gray-200 rounded-full dark:bg-gray-700 m-2 w-32"></div>
                      </td>
                      <td>
                        <div className="h-5 inline-block bg-gray-200 rounded-full dark:bg-gray-700 m-2 w-32"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
