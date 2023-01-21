'use client';

import { classNames } from '@/app/AppNav';
import { FormEvent, useReducer } from 'react';

const initialState = {
  url: '',
  threads: 4,
  status: 'INIT',
};

type ACTIONTYPE =
  | { type: 'UPDATE_URL'; payload: string }
  | { type: 'UPDATE_STATUS'; payload: 'LOADING' | 'SUCCESS' | 'ERROR' }
  | { type: 'UPDATE_THREADS'; payload: number };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'UPDATE_URL':
      return { ...state, url: action.payload };
    case 'UPDATE_STATUS':
      return { ...state, status: action.payload };
    case 'UPDATE_THREADS':
      return { ...state, threads: action.payload };
    default:
      throw new Error('No action type');
  }
}

export default function AddNewArticle() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Send fetch request
    dispatch({ type: 'UPDATE_STATUS', payload: 'LOADING' });
    fetch('/api/articles/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: state.url, totalTweets: state.threads }),
    })
      .then((res) => res.json())
      .then((_) => {
        dispatch({ type: 'UPDATE_STATUS', payload: 'SUCCESS' });
      })
      .catch((e) => {
        dispatch({ type: 'UPDATE_STATUS', payload: 'ERROR' });
      });
    // Then redirect to article page
  }

  return (
    <div className="font-sans">
      <h1 className="text-2xl font-semibold text-gray-900">Add New Article</h1>
      <form
        className="mt-4 bg-white px-4 py-6 sm:p-12 shadow sm:rounded-md"
        onSubmit={onSubmit}
      >
        <div className="sm:overflow-hidden max-w-2xl my-0 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <div className="flex-1">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Article URL
              </label>
              <input
                type="text"
                value={state.url}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_URL', payload: e.target.value })
                }
                name="article-url"
                id="url"
                className="p-2 pl-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://"
              />
            </div>
            <div>
              <label
                htmlFor="threads"
                className="block text-sm font-medium text-gray-700"
              >
                Number of tweets in thread
              </label>
              <input
                value={state.threads}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_THREADS',
                    payload: Number(e.target.value),
                  })
                }
                type="number"
                name="threads"
                id="threads"
                className="p-2 pl-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex md:justify-end">
            <button
              type="submit"
              aria-disabled={state.status === 'LOADING'}
              className={classNames(
                state.status === 'LOADING'
                  ? 'cursor-not-allowed opacity-50'
                  : '',
                `inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`
              )}
            >
              {state.status === 'LOADING' ? 'Submitting' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
