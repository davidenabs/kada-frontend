import { FilledArrowRight } from "@/icons";

interface FeatureCardProps {
    title: string;
    className?: string;
  }
  
  const FeatureCard: React.FC<FeatureCardProps> = ({ title, className }) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex overflow-hidden grow gap-5 justify-between px-6 py-8 text-lg leading-6 text-black rounded-2xl border border-solid border-zinc-400 max-md:px-5 max-md:mt-6">
          <div>{title}</div>
          <FilledArrowRight className="object-contain shrink-0 my-auto w-4 aspect-square" />
        </div>
      </div>
    );
  };
  
  export default FeatureCard;