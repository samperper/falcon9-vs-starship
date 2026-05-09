function Section({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className}`}>
      <div className="mb-8 max-w-[680px] space-y-3">
        {eyebrow ? (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl">
            {title}
          </h2>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default Section;
