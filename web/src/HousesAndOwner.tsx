import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { UserHouseQuery } from "./generated/typesFromGraphql";

const query = loader("./graphql/houseowner.graphql");

export const HousesAndOwner = () => {
  const { loading, error, data } = useQuery<UserHouseQuery>(query, {
    variables: { ids: [1, 2, 3] },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data?.houses) {
    return (
      <div>
        <h1>Results</h1>
        {data?.houses.map((h) => {
          return (
            <div>
              <h2>{h.id}</h2>
              <p>
                <span>Square Feet:</span>
                <span>{h.squarefeet}</span>
                <h3> Owner </h3>
                {h.owner.fullname}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <h1>No Results</h1>
      <p>There is no results</p>
    </div>
  );
};
