export default function ModernBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-slate-950 to-orange-950/20" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-green-900/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-900/8 to-transparent" />
    </div>
  )
}
