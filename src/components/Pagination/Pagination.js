import React from "react";
import { Icon, Pagination as PaginationSR } from "semantic-ui-react";

import "./Pagination.scss";

export default function Pagination() {
  return (
    <div className="paginationSR">
      <PaginationSR
        defaultActivePage={1}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={50}
      />
    </div>
  );
}
