# bccapp�p�b�P�[�W

## �͂��߂�
�{���|�W�g���́C�r�[�`�N���[���N���E�h�T�[�r�X�̕Y���S�~���o���SaaS�̃A�v���P�[�V�����p���|�W�g���ł��D

## �J����
### Node & React
node 19.5.0  
react 17.0.2  

### 3rd party
``` npm list ```�����s�����npm�p�b�P�[�W�ꗗ������܂��D

### ���[�J���f�o�b�O���@
``` npm start ```�����s���C``` http://localhost:3000 ```�Ƀu���E�U����A�N�Z�X���邱�ƂŃ��[�J���f�o�b�O���ł��܂��D

## �J���ҏ��
�t�����g�G���h�ƂȂ�A�v���̃\�[�X�R�[�h�́Csrc�f�B���N�g���ȉ��ɑS�Ĕz�u����Ă��܂��D�����R�[�f�B���O�����̂�src/components�f�B���N�g���z����javascript�\�[�X�i.js�j�ł��D

### components
javascript + React�A�v���́C�u�R���|�[�l���g�v�ƌĂ΂��P�ʂŉ�ʂ��\�����C�{�^�������ȂǃC�x���g�����ƕ`�悪�i��ł����܂��D�R���|�[�l���g�̐݌v��K���ɍs���ƁC�g�����C�ė��p���̒ቺ�������C�C���������܂��D  
�{���|�W�g���ł́C�ȉ��̃f�B���N�g���\�����K��Ƃ��ăR���|�[�l���g�𕪗ނ��݌v���Ă��܂��D  
#### components�f�B���N�g���\��
- __pages__  
�E�F�u�A�v���̂P�y�[�W���`����R���|�[�l���g��z�u����f�B���N�g���ł��Dpages�R���|�[�l���g��views�R���|�[�l���g���q�Ƃ��Ď����܂��D
- __views__  
pages�R���|�[�l���g�̎q�ƂȂ�R���|�[�l���g�Q��views�Ƃ��܂��D
�t�F�b�`�����CPUT�CGET�Ȃ�API��@���������s���C���R���|�[�l���g�Ƀf�[�^��z�z������������R���|�[�l���g��z�u����f�B���N�g���ł��Dviews�R���|�[�l���g�́Ctemplates�Cparts�R���|�[�l���g���q�Ƃ��Ď����܂��D
- __templates__  
�x�[�X�R���|�[�l���g�̈قȂ��r�I���G�ȃ��C�A�E�g�����R���|�[�l���g��templates�R���|�[�l���g�Ƃ��܂��D������parts�R���|�[�l���g���q�Ƃ��C�g�ݍ��킹�č쐬�����R���|�[�l���g�ł��D
- __parts__  
�ŏ��P�ʂ̃R���|�[�l���g�ł��D����parts�R���|�[�l���g�ɔz�u�����Ƃ��āC�e����n�����props���������C��ʂ̃��C�A�E�g�ւ̈ˑ��x���Ⴂ�������K�͂̃R���|�[�l���g�Ƃ��Ă��܂��D

��L���ނɏ]���݌v�̗�������܂��D  
Home (pages)  
&emsp;-> PhotoView (views)  
&emsp;&emsp;-> PhotoList (templates)  
&emsp;&emsp;&emsp;-> PhotoListItem (parts)
  
- Home��page�R���|�[�l���g�ł���Cviews�R���|�[�l���g���q�Ƃ��Ď��̂݁D�����ł̓E�F�uAPI��@���Ȃ��D
- PhotoView��views�R���|�[�l���g�ł���C�E�F�uAPI��@���āC�T�[�o��̃f�[�^�̃t�F�b�`�����Ȃǂ��s���D�܂�templates�R���|�[�l���g���q�Ƃ��Ă���C�t�F�b�`�����f�[�^��props�n�����s���D����ɁC�q�R���|�[�l���g�̃R�[���o�b�N�֐��̒�`���s���CPUT��GET�Ȃǂ�API������views�R���|�[�l���g���S������D
- PhotoList��templates�R���|�[�l���g�ł���DPhotoListItem�R���|�[�l���g�𕡐������C�����̃��C�A�E�g�̌��茠�����D
- PhotoListItem�͈ꖇ�̉摜����т��̉摜�Ɋւ�����̕\���Ȃǂ��s��UI�R���|�[�l���g�ł���D���o�I�ȉe�����傫���̂͂���parts�R���|�[�l���g�ł���D

�d�v�Ȃ̂́C__views�R���|�[�l���g�ȊO�̃R���|�[�l���g��API��@���Ȃ����Ƃł���__�D�\�Ȍ���templates�Cparts�R���|�[�l���g�Ńt�F�b�`�CPUT�CGET���s��Ȃ��C�K��views�R���|�[�l���g����props����ĕ\������f�[�^���󂯎�邱�Ƃɂ���݌v�����炷��D���ʂ̏��K�̓R���|�[�l���g�����ꂼ��API�����R�ɌĂяo���n�߂�ƁC�V�X�e���Ǘ����ُ�ɍ���ƂȂ�i�ǂ�state���\���ΏۂȂ̂����Ƃł킩��Ȃ��Ȃ�D���ۂȂ����j�C�o�O�̔������ł��Ȃ��D�܂��C���̐݌v�v�z��C�d�v�ȃf�[�^�i�t�F�b�`�����f�[�^�Ȃǁj��views�R���|�[�l���g�ɑS�ďW�񂳂�邱�ƂƂȂ�Cstate�̈ꌳ�Ǘ����\�ƂȂ�Dtemplates�����parts�R���|�[�l���g�́C�����܂ł� __�n���ꂽ�f�[�^���ǂ̂悤�ɕ\�����邩�ɏW�����ĊJ�����ׂ�__ �ł���D  

�ȏ�̐݌v�v�z���}�X�^�[����ɂ́C__�P�jprops������e����q�ւ̒l�̓n�����C�Q�j�q�̃R���|�[�l���g�Ŕ��������C�x���g��e�֓`�B������@__ �ɂ��ăR�[�f�B���O�ł���悤�ɂȂ��Ă��Ȃ�����΂Ȃ�Ȃ��D

