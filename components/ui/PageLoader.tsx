import Spinner from './Spinner';

export interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({ message = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-deep-obsidian">
      <Spinner size="xl" variant="primary" />
      {message && (
        <p className="mt-6 text-cloud-dancer/70 font-hanken text-lg">
          {message}
        </p>
      )}
    </div>
  );
};

PageLoader.displayName = 'PageLoader';

export default PageLoader;
