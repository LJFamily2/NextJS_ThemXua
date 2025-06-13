'use client';

import React from 'react';

interface InfiniteScrollingProps {
  text?: string;
}

export default function InfiniteScrolling({
  text = 'Thềm Xưa',
}: InfiniteScrollingProps) {
  return (
    <div className="infiniteScrolling">
      <div className="scrollItem">
        <h1>{text}</h1>
      </div>
      <div className="scrollItem item_2">
        <h1>{text}</h1>
      </div>
      <div className="scrollItem item_3">
        <h1>{text}</h1>
      </div>
      <div className="scrollItem item_4">
        <h1>{text}</h1>
      </div>
    </div>
  );
}
