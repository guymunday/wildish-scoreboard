import { useEffect, useState } from "react";

export default function ClientOnly({ children, ...rest }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="yellow" {...rest}>
      {children}
    </div>
  )
}
