import CarouselCard from "../../../components/extras/CarouselCards";

const sampleData = [
  { title: "React", desc: "Frontend library" },
  { title: "Node.js", desc: "Backend runtime" },
  { title: "PostgreSQL", desc: "Database" },
  { title: "Next.js", desc: "Fullstack framework" },
  { title: "Next.js", desc: "Fullstack framework" },
  { title: "Next.js", desc: "Fullstack framework" },
  { title: "Next.js", desc: "Fullstack framework" },
  { title: "Next.js", desc: "Fullstack framework" },
];

export default function TestPage() {
  return <CarouselCard items={sampleData} />;
}
