import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="神大人嚟啦！特别制作"
    links={[
      {
        key: 'Home',
        title: 'Home',
        href: 'https://github.com/shanzhaozhen',
        blankTarget: true,
      },
      {
        key: 'github repositories ',
        title: <GithubOutlined />,
        href: 'https://github.com/shanzhaozhen/hrs-client',
        blankTarget: true,
      },
      {
        key: 'Github',
        title: 'Github',
        href: 'https://github.com/shanzhaozhen',
        blankTarget: true,
      },
    ]}
  />
);
