export default function MessagesPage() {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6658e8]">
        Workspace / Messages
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#202136]">Messages</h1>
      <p className="mt-2 text-sm text-[#77798d]">
        A dedicated inbox for customer conversations.
      </p>
      <div className="mt-7 rounded-2xl border border-dashed border-[#d8d7e6] bg-white p-10 text-center">
        <h2 className="font-bold text-[#202136]">
          Your inbox is being prepared
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#85869a]">
          Messaging will be connected after the leads and bookings workflows.
          This keeps conversations linked to the right customer, business and
          service.
        </p>
      </div>
    </>
  );
}
