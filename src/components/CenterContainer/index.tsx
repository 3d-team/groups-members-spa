export default function CenterContainer({children}: any) {
  return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>{children}</div>;
}
