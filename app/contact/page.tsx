'use client';

import { Suspense } from "react";
import ContactPageContent from "./Contactus";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
