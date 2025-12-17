import svgPaths from "./svg-tqitopw8zq";
import clsx from "clsx";
import imgAvatar from "figma:asset/20cea7098efaa8b7408be5c04193280e3c931d50.png";
import imgAvatar1 from "figma:asset/c50ee655d2452caa0fa7ed74cdb080d48e2146c4.png";
import imgAvatar2 from "figma:asset/35a664c4b859e16fd05876e2011ce236732e66bf.png";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        {children}
      </svg>
    </div>
  );
}

function LabelNormal({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[2px] shrink-0">
      <div className="content-stretch flex font-normal gap-[4px] items-center justify-center leading-[16px] overflow-clip px-[4px] py-[2px] relative rounded-[inherit] text-black text-nowrap">{children}</div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}
type TabProps = {
  additionalClassNames?: string;
};

function Tab({ children, additionalClassNames = "" }: React.PropsWithChildren<TabProps>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative rounded-[12px] shrink-0", additionalClassNames)}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Article2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <div className="flex-none rotate-[180deg] w-full">
        <div className="h-0 relative w-full">
          <div className="absolute inset-[-1px_0_0_0]">{children}</div>
        </div>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] overflow-ellipsis overflow-hidden relative shrink-0 text-[10px] text-center text-nowrap w-full", additionalClassNames)}>
      <p className="leading-[14px] overflow-ellipsis overflow-hidden">{text}</p>
    </div>
  );
}

function Selection2Helper() {
  return (
    <Wrapper>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 1">
        <line id="Line 1" stroke="var(--stroke-0, #D9D9D9)" x2="110" y1="0.5" y2="0.5" />
      </svg>
    </Wrapper>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <ul style={{ fontVariationSettings: "'wdth' 100" }} className="block relative shrink-0">
      <li className="ms-[16.5px]">
        <span className="leading-[20px]">{text}</span>
      </li>
    </ul>
  );
}
type Helper6Props = {
  text: string;
  text1: string;
};

function Helper6({ text, text1 }: Helper6Props) {
  return (
    <div className="content-stretch flex font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal gap-[8px] items-start leading-[0] opacity-50 relative shrink-0 text-[11px] text-black text-nowrap w-full">
      <Text text={text} />
      <Text text={text1} />
    </div>
  );
}

function Selection() {
  return (
    <div className="h-[8px] relative shrink-0 w-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 288 8">
        <g id="Selection">
          <line id="Line 1" stroke="var(--stroke-0, #D9D9D9)" x1="288" x2="-4.37114e-08" y1="4.50003" y2="4.5" />
        </g>
      </svg>
    </div>
  );
}
type Helper5Props = {
  text: string;
  text1: string;
};

function Helper5({ text, text1 }: Helper5Props) {
  return (
    <div className="content-stretch flex items-start justify-between leading-[20px] relative shrink-0 text-black text-nowrap w-full">
      <p className="font-['Roboto:Medium',sans-serif] font-medium relative shrink-0 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal relative shrink-0 text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}

function SelectionHelper() {
  return (
    <Wrapper>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 1">
        <line id="Line 1" stroke="var(--stroke-0, #D9D9D9)" x2="97.5" y1="0.5" y2="0.5" />
      </svg>
    </Wrapper>
  );
}

function Helper4() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="flex-none rotate-[180deg]">
        <div className="h-0 relative w-[80px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 1">
              <line id="Line 1" stroke="var(--stroke-0, #D9D9D9)" strokeDasharray="2 2" x2="80" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Helper3() {
  return (
    <div className="relative shrink-0 size-[6px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
        <circle cx="3" cy="3" fill="var(--fill-0, #D9D9D9)" id="Ellipse 100" r="3" />
      </svg>
    </div>
  );
}
type Helper2Props = {
  text: string;
  text1: string;
  text2: string;
};

function Helper2({ text, text1, text2 }: Helper2Props) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black w-[40px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <Helper3 />
      <Helper4 />
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
      <Helper4 />
      <Helper3 />
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black text-right w-[40px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text2}
      </p>
    </div>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Helper1({ text, text1, additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("content-stretch flex font-normal items-start justify-between leading-[20px] relative shrink-0 text-nowrap w-full", additionalClassNames)}>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 text-nowrap">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[16px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text1}
      </p>
    </div>
  );
}

function Article() {
  return (
    <Article2>
      <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
        <Helper1 text="03.05 THU 17:05 PM" text1="03.05 THU 20:35 PM" additionalClassNames="font-['Roboto:Regular',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]" />
        <Helper2 text="KHH" text1="🛫" text2="PUS" />
        <Helper1 text="小港國際機場 I 高雄" text1="釜山 I 釜山" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]" />
        <div className="content-stretch flex gap-[6px] items-center overflow-clip px-0 py-[4px] relative shrink-0 w-full" data-name="Selection">
          <SelectionHelper />
          <LabelNormal>
            <div className="content-stretch flex font-['Roboto:Regular',sans-serif] gap-px items-center relative shrink-0 text-[11px]">
              <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                2
              </p>
              <p className="opacity-50 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                h
              </p>
              <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                30
              </p>
              <p className="opacity-50 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                m
              </p>
            </div>
            <p className="font-['Roboto:Regular',sans-serif] opacity-10 relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              |
            </p>
            <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] relative shrink-0 text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              直飛
            </p>
          </LabelNormal>
          <SelectionHelper />
        </div>
        <Helper1 text="濟州航空JEJUair" text1="7C6256 (波音 737-800)" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] text-[11px] text-black" />
        <Helper5 text="51D (Window)" text1="訂位代號 GA6AG6" />
        <Selection />
        <Helper6 text="15kg 免費託運行李" text1="經濟艙" />
      </div>
    </Article2>
  );
}

function Article1() {
  return (
    <Article2>
      <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
        <Helper1 text="03.09 MON 14:05 PM" text1="03.09 MON 16:05 PM" additionalClassNames="font-['Roboto:Regular',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]" />
        <Helper2 text="PUS" text1="🛫" text2="KHH" />
        <Helper1 text="釜山 I 釜山" text1="小港國際機場 I 高雄" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)]" />
        <div className="content-stretch flex gap-[6px] items-center overflow-clip px-0 py-[4px] relative shrink-0 w-full" data-name="Selection">
          <Selection2Helper />
          <LabelNormal>
            <div className="content-stretch flex font-['Roboto:Regular',sans-serif] gap-px items-center relative shrink-0 text-[11px]">
              <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                3
              </p>
              <p className="opacity-50 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                h
              </p>
            </div>
            <p className="font-['Roboto:Regular',sans-serif] opacity-10 relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              |
            </p>
            <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] relative shrink-0 text-[11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              直飛
            </p>
          </LabelNormal>
          <Selection2Helper />
        </div>
        <Helper1 text="濟州航空JEJUair" text1="7C6255 (波音 737-800)" additionalClassNames="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] text-[11px] text-black" />
        <Helper5 text="51D (Window)" text1="訂位代號 GA6AG6" />
        <Selection />
        <Helper6 text="15kg 免費託運行李" text1="經濟艙" />
      </div>
    </Article2>
  );
}

export default function Page() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-center pb-[80px] pt-0 px-0 relative size-full" data-name="Page">
      <div className="bg-white content-stretch flex flex-col items-start relative shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] shrink-0 w-full" data-name="Top Bar">
        <div className="bg-white h-[24px] relative shrink-0 w-full" data-name="top">
          <div className="absolute h-[10.227px] right-[8.72px] top-[calc(50%+0.02px)] translate-y-[-50%] w-[33.64px]" data-name="time">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 11">
              <g id="time">
                <path d={svgPaths.p13a21a00} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.pfaefa80} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.p27edf200} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.p1105e700} fill="var(--fill-0, black)" fillOpacity="0.7" />
                <path d={svgPaths.p10f6cf00} fill="var(--fill-0, black)" fillOpacity="0.7" />
              </g>
            </svg>
          </div>
          <div className="absolute h-[14px] right-[51px] top-1/2 translate-y-[-50%] w-[9px]" data-name="battery">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
              <path clipRule="evenodd" d={svgPaths.p11a2ad80} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="battery" />
            </svg>
          </div>
          <div className="absolute right-[69px] size-[14px] top-1/2 translate-y-[-50%]" data-name="cellular">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path clipRule="evenodd" d="M0 14H14V0L0 14Z" fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="cellular" />
            </svg>
          </div>
          <div className="absolute h-[14px] right-[84.98px] top-1/2 translate-y-[-50%] w-[18.045px]" data-name="wifi">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
              <path d={svgPaths.p17036780} fill="var(--fill-0, black)" fillOpacity="0.7" id="wifi" />
            </svg>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="content">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[12px] relative w-full">
              <p className="basis-0 font-['Roboto:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                票券
              </p>
              <div className="content-stretch flex items-center p-[4px] relative shrink-0">
                <div className="relative shrink-0 size-[20px]" data-name="ic-search">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="ic-search">
                      <path clipRule="evenodd" d={svgPaths.p401e00} fill="var(--fill-0, black)" fillRule="evenodd" id="shape" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="list">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-0 relative w-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full" data-name="item">
              <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 size-[32px]" data-name="frame">
                <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-1/2 overflow-ellipsis overflow-hidden size-[32px] text-[20px] text-black text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[32px] overflow-ellipsis overflow-hidden">🛫</p>
                </div>
              </div>
              <div className="basis-0 content-stretch flex flex-col font-normal grow items-start min-h-px min-w-px relative shrink-0">
                <p className="font-['Roboto:Regular',sans-serif] leading-[20px] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Airplane
                </p>
                <p className="font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                  機票總覽
                </p>
              </div>
              <div className="absolute bottom-0 h-0 left-0 right-0">
                <div className="absolute inset-[-0.5px_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 1">
                    <path d="M0 0.5H336" id="Vector 200" stroke="var(--stroke-0, black)" strokeOpacity="0.1" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
                <div className="flex-none rotate-[90deg]">
                  <div className="relative size-[16px]" data-name="weui:arrow-outlined">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="weui:arrow-outlined">
                        <path d={svgPaths.p2d368900} fill="var(--fill-0, black)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full" data-name="list">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[12px] py-0 relative w-full">
                  <div className="content-stretch flex gap-[12px] items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Avatar">
                    <div className="relative rounded-[40px] shrink-0 size-[40px]" data-name="avatar">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgAvatar} />
                    </div>
                    <Helper text="LT Tsai" text1="Travel Enthusiast" />
                  </div>
                  <Article />
                  <Article1 />
                  <div className="content-stretch flex gap-[12px] items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Avatar">
                    <div className="relative rounded-[40px] shrink-0 size-[40px]" data-name="avatar">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgAvatar1} />
                    </div>
                    <Helper text="LC Tsai" text1="Travel Enthusiast" />
                  </div>
                  <Article />
                  <Article1 />
                  <div className="content-stretch flex gap-[12px] items-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Avatar">
                    <div className="relative rounded-[40px] shrink-0 size-[40px]" data-name="avatar">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgAvatar2} />
                    </div>
                    <Helper text="SF Wu" text1="Travel Enthusiast" />
                  </div>
                  <Article />
                  <Article1 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white bottom-0 content-stretch flex items-start left-0 overflow-clip px-[8px] py-[4px] right-0 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)]" data-name="bottom nav">
        <Tab>
          <Wrapper1>
            <g id="material-symbols-light:home-outline-rounded">
              <path d={svgPaths.p3f8cb400} fill="var(--fill-0, black)" id="Vector" />
            </g>
          </Wrapper1>
          <Text1 text="Home" additionalClassNames="text-black" />
        </Tab>
        <Tab>
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="meteor-icons:calendar">
            <div className="absolute inset-[17.86%_21.07%]" data-name="Group">
              <div className="absolute inset-[-2.78%_-3.09%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
                  <g id="Group">
                    <path d={svgPaths.pa030100} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.pa72f00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Text1 text="Explore" additionalClassNames="text-black" />
        </Tab>
        <Tab additionalClassNames="bg-black">
          <Wrapper1>
            <g id="lucide:ticket">
              <path d={svgPaths.p16b6cd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </Wrapper1>
          <Text1 text="Notifications" additionalClassNames="text-white" />
        </Tab>
        <Tab>
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="tabler:shopping-cart">
            <div className="absolute inset-[12.5%_16.67%]" data-name="Group">
              <div className="absolute inset-[-2.38%_-2.68%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
                  <g id="Group">
                    <path d={svgPaths.p2dc91b00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.p11febe80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgPaths.p15a11980} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Text1 text="Settings" additionalClassNames="text-black" />
        </Tab>
        <Tab>
          <Wrapper1>
            <g id="proicons:food">
              <path d={svgPaths.p232fe280} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </Wrapper1>
          <Text1 text="Settings" additionalClassNames="text-black" />
        </Tab>
      </div>
    </div>
  );
}