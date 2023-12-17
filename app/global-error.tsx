'use client';

const GlobalError = () => (
  <html>
    <body>
      <div className='flex h-screen'>
        <div className='m-auto flex'>
          <h1 className='leading-12 mx-5 my-0 inline-block border-r border-gray-800 pr-6 align-top text-4xl font-bold dark:border-gray-200'>
            Oops!
          </h1>
          <div className='flex items-center'>
            <h2 className='leading-12 m-0 font-light'>Something went wrong.</h2>
          </div>
        </div>
      </div>
    </body>
  </html>
);

export default GlobalError;
