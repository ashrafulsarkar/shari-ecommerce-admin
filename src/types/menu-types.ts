export interface ISidebarMenus {
  id: number;
  icon: () => JSX.Element;
  link: string;
  title: string;
  roles:string[];
  subMenus?: {
    title: string;
    link: string;
    roles:string[];
  }[]
}