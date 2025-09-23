import BlueDot from "./BlueDot";

export default function BlueDotLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-5 overflow-hidden">
      {/* Randomly scattered dots across the entire viewport */}
      <div className="absolute top-[15%] left-[25%] opacity-30">
        <BlueDot size="lg" animated />
      </div>
      <div className="absolute top-[35%] left-[65%] opacity-20">
        <BlueDot size="sm" />
      </div>
      <div className="absolute top-[55%] left-[15%] opacity-25">
        <BlueDot size="md" />
      </div>
      <div className="absolute top-[75%] left-[75%] opacity-30">
        <BlueDot size="sm" />
      </div>
      
      <div className="absolute top-[25%] left-[45%] opacity-25">
        <BlueDot size="md" />
      </div>
      <div className="absolute top-[45%] left-[85%] opacity-20">
        <BlueDot size="lg" />
      </div>
      <div className="absolute top-[65%] left-[35%] opacity-30">
        <BlueDot size="sm" />
      </div>
      <div className="absolute top-[85%] left-[55%] opacity-25">
        <BlueDot size="md" />
      </div>
      
      <div className="absolute top-[10%] left-[85%] opacity-20">
        <BlueDot size="md" />
      </div>
      <div className="absolute top-[30%] left-[5%] opacity-30">
        <BlueDot size="sm" />
      </div>
      <div className="absolute top-[50%] left-[95%] opacity-25">
        <BlueDot size="md" />
      </div>
      <div className="absolute top-[70%] left-[5%] opacity-20">
        <BlueDot size="lg" />
      </div>
      
      <div className="absolute top-[20%] left-[75%] opacity-15">
        <BlueDot size="sm" />
      </div>
      <div className="absolute top-[40%] left-[25%] opacity-20">
        <BlueDot size="md" />
      </div>
      <div className="absolute top-[60%] left-[65%] opacity-25">
        <BlueDot size="sm" />
      </div>
      <div className="absolute top-[80%] left-[35%] opacity-15">
        <BlueDot size="lg" />
      </div>
    </div>
  );
}
