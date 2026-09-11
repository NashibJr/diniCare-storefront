import { PropsWithChildren } from "react";
import { Oval } from "react-loader-spinner";

type SuspenseTypes = PropsWithChildren & {
  isLoading: boolean;
};

const Suspense: React.FC<SuspenseTypes> = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center py-3">
          <Oval
            height={22}
            width={22}
            color="pink"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="pink"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Suspense;
