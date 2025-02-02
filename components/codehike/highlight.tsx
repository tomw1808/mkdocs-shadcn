import { AnnotationHandler } from "codehike/code"

export const borderHandler: AnnotationHandler = {
  name: "highlight",
  Block: ({ annotation, children }) => {
    return <div className="bg-yellow-100/30 dark:bg-yellow-500/30">{children}</div>
  },
}