//import banner from "/img/khemarat.jpg";
import colors from './colors';
import theme from './theme';

export default {
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      navigation: {
        width: '100%',
        background: colors.green,
        color: '#fff',
        marginBottom: 10
      },
      cheat: {
        width: '100%',
        background: colors.red,
        color: '#fff',
      },
      choiceButton1: {
        width: '100%',
        marginBottom: 10,
        textTransform: 'none',
        background: theme.palette.secondary.main,
      },
      choiceButton2: {
        width: '100%',
        marginBottom: 10,
        textTransform: 'none',
        background: theme.palette.primary.main,
        color: '#FFF',
      },
      content: {
        marginTop: 60,
        
      },
      lessonContent: {
        margin: 12,
      },
      loading: {
        padding: 15,
      },
      noResults: {
        padding: 30,
      },
      pos: {
        marginBottom: 12,
      },
      full: {
        flex: 1,
      },
      gridItem90: {
        width: '90%',
      },
      upper: {
        background: theme.palette.secondary.dark,
        color: theme.palette.primary.contrastText,
      },
      second: {
        background: theme.palette.secondary.light,
      },
      white: {
        background: theme.palette.primary.contrastText,
      },
      info: {
        padding: 20,
      },
      header: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 40,
        paddingLeft: 20,
      },
      headerText: {
        paddingTop: 0,
        paddingLeft: 12,
      },
      list: {
        background: theme.palette.primary.contrastText,
      },
      listMenuItem: {
        padding: 20 ,
      },
      subCategoryListItem: {
        background: theme.palette.secondary.light,
        marginBottom: 2,
      },
      listLink: {
        textDecoration: 'none',
      },
      defaultCard: {
        background: "#FFFFFF",
        width: '100%',
        marginBottom: 8,
        transition: '1s'
      },
      correctCard: {
        background: colors.green,
        width: '100%',
        marginBottom: 8,
      },
      correctCardFade: {
        background: colors.green,
        width: '100%',
        marginBottom: 8,
        transition: '0.5s',
        visibility: 'hidden',
      },
      wrongCard: {
        background: colors.red,
        width: '100%',
        marginBottom: 8,
      },
      upperChip: {
        marginBottom: 5,
        marginRight: 4,
      },
      defaultChip: {
        background: theme.palette.secondary.main,
        padding: 5,
        marginBottom: 5,
        marginRight: 4,
        transition: '1s'
      },
      disabledChip: {
        background: theme.palette.secondary.light,
        padding: 5,
        marginBottom: 5,
        marginRight: 4,
        transition: '1s'
      },
      hiddenChip: {
        visibility: 'hidden',
        marginBottom: 5,
        marginRight: 4,
      },
      correctChip: {
        background: colors.green,
        padding: 5,
        marginBottom: 5,
        marginRight: 4,
      },
      correctChipFade: {
        background: colors.green,
        padding: 5,
        marginBottom: 5,
        marginRight: 5,
        transition: '0.2s',
        visibility: 'hidden',
      },
      wrongChip: {
        background: colors.red,
        padding: 5,
        marginBottom: 5,
        marginRight: 4,
      },
      totals: {
        padding: 30,
        backgroundColor: theme.palette.secondary.main,
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20,
      },
      topMargin: {
        marginTop: 0,
      },
      textField: {
        width: '95%',
      },
      notes: {
        background: theme.palette.secondary.light,
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5
      },
      contentContainer: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      container: {
        marginLeft: 15,
        marginRight: 15,
      },
      titleCard: {
        margin: 10,
      },
      imageHolder: {
        padding: 7,
      },
      imageHolderWrong: {
        padding: 7,
        backgroundColor: colors.red,
      },
      imageHolderCorrect: {
        padding: 7,
        backgroundColor: colors.green,
      },
      imageFit: {
        width: '100%',
        maxWidth: 500,
      },
      imageBlur: {
        width: '100%',
        maxWidth: 500,
        opacity: 0.3,
      },
      middle: {
        transition: '.5s ease',
        opacity: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      },
      imageTable: {
        width: 'auto',
      },
      matching: {
        width: 400,
        textAlign: 'center',
      },
      alt: {
        background: theme.palette.secondary.main,
      },
      highlightCorrect: {
          background: colors.green,
      },
      highlightWrong: {
          background: colors.red,
      },
      playIcon: {
        width: 30,
        height: 30,
        marginTop: 5,
        color: colors.green,
      },
      correctIcon: {
        width: 50,
        height: 50,
        marginTop: 5,
        color: colors.green,
      },
      wrongIcon: {
        width: 50,
        height: 50,
        marginTop: 5,
        color: colors.red,
      },
      playingIcon: {
        width: 30,
        height: 30,
        marginTop: 5,
        color: colors.blue,
      },
      table: {
        display: 'table',
        borderCollapse: 'collapse',
        width: '100%',
        tableLayout: 'fixed',
        marginBottom: 0,
        paddingBottom: 0,
      },
      tableCell: {
        display: 'table-cell',
        border: 0,
      },
      tableCellImg: {
        width: '100%',
      },
      visible: {
        visibility: 'visible',
      },
      hidden: {
        visibility: 'collapse',
      },
}